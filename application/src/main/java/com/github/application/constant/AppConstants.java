package com.github.application.constant;

import liquibase.repackaged.org.apache.commons.collections4.BidiMap;
import liquibase.repackaged.org.apache.commons.collections4.bidimap.DualHashBidiMap;

public class AppConstants {
    public static class StringUtility {
        public static final BidiMap<String, String> escapeChars = new DualHashBidiMap<>() {
            {
                put(" ", "$20");
                put("$", "$24");
                put("&", "$26");
                put("`", "$60");
                put(":", "$3A");
                put("<", "$3C");
                put(">", "$3E");
                put("[", "$5B");
                put("]", "$5D");
                put("{", "$7B");
                put("}", "$7D");
                put("\"", "$22");
                put("+", "$2B");
                put("#", "$23");
                put("%", "$25");
                put("@", "$40");
                put("/", "$2F");
                put(";", "$3B");
                put("=", "$3D");
                put("?", "$3F");
                put("\\", "$5C");
                put("^", "$5E");
                put("|", "$7C");
                put("~", "$7E");
                put("'", "$27");
            }
        };
    }

}
