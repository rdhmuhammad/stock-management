package com.github.application.util;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

public interface DateUtil {
    int getDay(Date date);

    int getWeek(Date date);

    int getMonth(Date date);

    int getYear(Date date);

    Long dateConverter(int day, int month, int year);

    Long dateConverter(int month, int year);

    boolean sameWeek(Date date1, Date date2);

    Calendar getStartOfWeek(int year, int weekNumber);

    Calendar getEndOfWeek(int year, int weekNumber);

    List<Calendar> getDaysInWeek(int year, int weekNumber);

    List<Long> getEpochDaysInWeek(int year, int weekNumber);

    List<Integer> getWeekNumbersInMonth(int year, int month);

    String dateFormat(Date date, String format);

    Date beginningOfDay(Date date);

    Date endOfDay(Date date);

    int getCurrentYear();

    int getCurrentWeek();

    int getCurrentMonth();
}
