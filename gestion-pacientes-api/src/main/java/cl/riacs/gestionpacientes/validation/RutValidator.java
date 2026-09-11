package cl.riacs.gestionpacientes.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class RutValidator implements ConstraintValidator<RutValido, String> {

    @Override
    public boolean isValid(String rut, ConstraintValidatorContext context) {

        if (rut == null || rut.isBlank()) {
            return true;
        }

        rut = rut.replace(".", "").replace("-", "").toUpperCase();

        if (!rut.matches("\\d{7,8}[0-9K]")) {
            return false;
        }

        String cuerpo = rut.substring(0, rut.length() - 1);
        char digitoVerificadorIngresado = rut.charAt(rut.length() - 1);

        int suma = 0;
        int multiplicador = 2;

        for (int i = cuerpo.length() - 1; i >= 0; i--) {
            suma += Character.getNumericValue(cuerpo.charAt(i)) * multiplicador;

            multiplicador++;

            if (multiplicador > 7) {
                multiplicador = 2;
            }
        }

        int resto = 11 - (suma % 11);

        char digitoVerificadorCalculado;

        if (resto == 11) {
            digitoVerificadorCalculado = '0';
        } else if (resto == 10) {
            digitoVerificadorCalculado = 'K';
        } else {
            digitoVerificadorCalculado = Character.forDigit(resto, 10);
        }

        return digitoVerificadorIngresado == digitoVerificadorCalculado;
    }
}