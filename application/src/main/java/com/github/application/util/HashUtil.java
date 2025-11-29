package com.github.application.util;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public interface HashUtil {
    String encrypt(String algo, String payload)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            IllegalBlockSizeException, BadPaddingException,
            InvalidKeySpecException, InvalidAlgorithmParameterException,
            InvalidKeyException;

    String decrypt(String algo, String payload)
            throws NoSuchPaddingException, NoSuchAlgorithmException,
            InvalidAlgorithmParameterException, InvalidKeyException,
            BadPaddingException, IllegalBlockSizeException,
            InvalidKeySpecException;

    public static String sha1(String text) {
        MessageDigest digest = null;
        try {
            if (text == null) text = "";
            digest = MessageDigest.getInstance("SHA-1");
            digest.update(text.getBytes(StandardCharsets.UTF_8), 0, text.length());
            byte[] sha1hash = digest.digest();
            return convertToHex(sha1hash);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
    }

    private static String convertToHex(byte[] data) {
        StringBuilder buf = new StringBuilder();
        for (byte b : data) {
            int halfbyte = (b >>> 4) & 0x0F;
            int two_halfs = 0;
            do {
                buf.append((0 <= halfbyte) && (halfbyte <= 9) ? (char) ('0' + halfbyte) : (char) ('a' + (halfbyte - 10)));
                halfbyte = b & 0x0F;
            } while (two_halfs++ < 1);
        }
        return buf.toString();
    }

}
