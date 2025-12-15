package com.github.application.constant;

import com.github.application.util.StringUtil;
import liquibase.repackaged.org.apache.commons.collections4.BidiMap;
import liquibase.repackaged.org.apache.commons.collections4.bidimap.DualHashBidiMap;
import lombok.extern.slf4j.Slf4j;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;
import java.util.TimeZone;

@Slf4j
public class AppConstants {
    public static class DATE_FORMAT {
        public static final String ResponseDateFormat = "yyyy-MM-dd'T'HH:mm:ssZ";

        public static final String RequestDateFormat = "yyyy-MM-dd";
        public static final String RequestDateTimeFormat = "yyyy-MM-dd'T'HH:mm:ss";

        public static final String ResponseDateFormatZ = "yyyy-MM-dd'T'HH:mm:ss'Z'";

        public static final String ResponseTimeZone = "Asia/Jakarta";

        public static String dateFormat(java.util.Date dt) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            return Objects.nonNull(dt) ? sdf.format(dt) : "";
        }

        public static Date dateFormat(String dt, String format) {
            return dateFormat(dt, format, ResponseTimeZone);
        }

        public static Date dateFormat(String dt, String format, String zoneId) {
            if (StringUtil.IsNullOrEmpty(dt)) return null;

            SimpleDateFormat formatter = new SimpleDateFormat(format, Locale.ENGLISH);
            formatter.setTimeZone(TimeZone.getTimeZone(zoneId));

            try {
                return formatter.parse(dt);
            } catch (Exception e) {
                log.error("PARSING DATETIME => {}", e.getMessage(), e);
                return null;
            }
        }
    }

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
