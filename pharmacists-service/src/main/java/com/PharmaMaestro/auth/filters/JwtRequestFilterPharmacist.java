package com.PharmaMaestro.auth.filters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.PharmaMaestro.auth.services.PharmacistDetailsServiceImpl;
import com.PharmaMaestro.auth.utils.JwtUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtRequestFilterPharmacist extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    private void writeJsonErrorResponse(HttpServletResponse response, int status, String message, String path) throws IOException {
        response.setContentType("application/json");
        response.setStatus(status);
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("timestamp", Instant.now().toString());
        responseBody.put("status", status);
        responseBody.put("error", "Unauthorized");
        responseBody.put("message", message);
        responseBody.put("path", path);

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getWriter(), responseBody);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        String userName = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);

            try {
                userName = jwtUtil.extractUserName(jwt);
            } catch (io.jsonwebtoken.ExpiredJwtException e) {
                writeJsonErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Le jeton JWT a expiré. Veuillez vous reconnecter.",
                        request.getRequestURI());
                return;
            } catch (Exception e) {
                writeJsonErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Le jeton JWT est invalide.",
                        request.getRequestURI());
                return;
            }
        }

        if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userName);

            if (!jwtUtil.isJwtExpired(jwt)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken
                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                writeJsonErrorResponse(response, HttpServletResponse.SC_UNAUTHORIZED,
                        "Le jeton JWT a expiré. Veuillez vous reconnecter.",
                        request.getRequestURI());
                return;
            }
        }

        chain.doFilter(request, response);
    }
}
