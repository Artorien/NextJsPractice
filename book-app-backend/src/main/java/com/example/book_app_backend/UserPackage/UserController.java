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
        String token = userService.generateToken();
        user.setToken(token);
        user.setDateOfCreation(LocalDate.now().toString());
        userService.saveUser(user);
        userService.sendEmail(user, token);

        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This email is taken");
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserBody loginBody) {
        if (loginBody.getToken() == null) {
            SecurityContext contextHolder = SecurityContextHolder.createEmptyContext();

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

            return ResponseEntity.ok(jwt);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Could not log in user");
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String token) {
        Optional<User> optionalUser = userService.findUserByToken(token);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setToken(null);
            userService.updateUser(user);

            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email verification failed");
    }
}
