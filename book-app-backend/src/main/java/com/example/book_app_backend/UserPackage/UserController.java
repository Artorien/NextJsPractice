package com.example.book_app_backend.UserPackage;

import com.example.book_app_backend.JWT.JwtTokenFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.example.book_app_backend.UserPackage.Authentication.UserBody;
import org.springframework.security.authentication.AuthenticationManager;

import java.time.LocalDate;
import java.util.Optional;

@RestController
public class UserController {
    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenFactory jwtTokenFactory;
    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody User user) {
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This email is already taken");
        }

        String token = userService.generateToken();
        user.setToken(token);
        user.setDateOfCreation(LocalDate.now().toString());
        userService.saveUser(user);
        userService.sendEmail(user, token);
        System.out.println("User by token: " + userService.findUserByToken(token));

        return ResponseEntity.status(HttpStatus.OK).body("Success");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserBody loginBody) {
        SecurityContext contextHolder = SecurityContextHolder.createEmptyContext();
        System.out.println("Password: " + loginBody.getPassword());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                            loginBody.getEmail(),
                            loginBody.getPassword()
                )
        );
        contextHolder.setAuthentication(authentication);
        SecurityContextHolder.setContext(contextHolder);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtTokenFactory.generateToken(userDetails.getUsername());
        Optional<User> optionalUser = userService.findUserByEmail(loginBody.getEmail());
        System.out.println("User: " + optionalUser);


        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setToken(jwt);
            userService.updateUser(user);

            System.out.println(ResponseEntity.ok(user));

            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("No such user");
    }

    @GetMapping("/verification")
    public ResponseEntity<?> verify(@RequestParam("token") String token) {
        System.out.println("Token: " + token);
        Optional<User> optionalUser = userService.findUserByToken(token);
        System.out.println("User: " + optionalUser);
        System.out.println("User present: " + optionalUser.isPresent());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
//
//            user.setToken(null);
//            userService.updateUser(user);
//
            return ResponseEntity.ok(user);
//            return ResponseEntity.ok("Successfully verified");
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email verification failed");
    }
}
