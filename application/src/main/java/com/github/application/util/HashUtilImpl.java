package com.github.application.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Arrays;
import java.util.Base64;

@Slf4j
@Component
public class HashUtilImpl implements HashUtil {

    private IvParameterSpec iv;

    private SecretKey key;

    public byte[] generateIvBytes() {
        byte[] iv = new byte[16];
        new SecureRandom().nextBytes(iv);
        return iv;
    }

    public void generateIv(byte[] ivBytes) {
        iv = new IvParameterSpec(ivBytes);
    }

    public void getKeyFromPassword(String secretPassword, String saltPassword)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(secretPassword.toCharArray(), saltPassword.getBytes(), 65536, 256);
        this.key = new SecretKeySpec(factory.generateSecret(spec)
                .getEncoded(), "AES");
    }


    public String encrypt(String algo, String payload)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            IllegalBlockSizeException, BadPaddingException,
            InvalidAlgorithmParameterException,
            InvalidKeyException {
        Cipher instance = Cipher.getInstance(algo);
        instance.init(Cipher.ENCRYPT_MODE, key, iv);
        byte[] chipper = instance.doFinal(payload.getBytes());
        return Base64.getEncoder().
                encodeToString(chipper);
    }

    public String decrypt(String algo, String payload)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException {

        Cipher cipher = Cipher.getInstance(algo);
        cipher.init(Cipher.DECRYPT_MODE, key, iv);
        byte[] plainText = cipher.doFinal(Base64.getDecoder()
                .decode(payload));
        return new String(plainText);
    }

    // ======================= USER TOKEN ==========================

    @Value("${server.config.token}")
    private String signatureToken;

    private String[] getDefaultUser() throws InvalidAlgorithmParameterException, NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeyException, InvalidKeySpecException {
        String users = decrypt("AES/CBC/PKCS5Padding", signatureToken);
        return users.split(",", 0);
    }

    public String getDefaultUserEmail() {
        try {
            String[] defaultUser = getDefaultUser();
            if (defaultUser.length >= 2) {
                return defaultUser[0];
            }
            log.error("invalid default user email with value = {}", Arrays.toString(defaultUser));
            return "";
        } catch (Exception e) {
            log.error("getDefaultUserEmail error =>", e);
            return "";
        }
    }

    public String getDefaultPassword() {
        try {
            String[] defaultUser = getDefaultUser();
            if (defaultUser.length >= 2) {
                return defaultUser[1];
            }
            log.error("invalid default user getDefaultPassword with value = {}", Arrays.toString(defaultUser));
            return "";
        } catch (Exception e) {
            log.error("getDefaultPassword error =>", e);
            return "";
        }
    }
}
