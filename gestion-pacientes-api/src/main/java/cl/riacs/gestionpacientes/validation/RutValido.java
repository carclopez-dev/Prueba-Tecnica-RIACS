package cl.riacs.gestionpacientes.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = RutValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface RutValido {

    String message() default "El RUT ingresado no es válido";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}