package com.github.application.util;

import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.*;

@Component
public class DateUtilImpl implements DateUtil {

    public Calendar dateCalendar(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar;
    }

    private static Instant getInstantLocalDate(int day, int month, int year) {
        LocalDate localDate = LocalDate.of(year, month, day);
        return localDate.atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant();
    }

    @Override
    public int getDay(Date date) {
        return dateCalendar(date).get(Calendar.DAY_OF_MONTH);
    }

    @Override
    public int getWeek(Date date) {
        return dateCalendar(date).get(Calendar.WEEK_OF_YEAR);
    }

    @Override
    public int getMonth(Date date) {
        return dateCalendar(date).get(Calendar.MONTH) + 1;
    }

    @Override
    public int getYear(Date date) {
        return dateCalendar(date).get(Calendar.YEAR);
    }

    @Override
    public Long dateConverter(int day, int month, int year) {
        Instant instant = getInstantLocalDate(day, month, year);
        return instant.toEpochMilli();
    }

    @Override
    public Long dateConverter(int month, int year) {
        Instant instant = getInstantLocalDate(1, month, year);
        return instant.toEpochMilli();
    }

    @Override
    public boolean sameWeek(Date date1, Date date2) {
        int year1 = getYear(date1);
        int week1 = getWeek(date1);

        int year2 = getYear(date2);
        int week2 = getWeek(date2);

        return year1 == year2 && week1 == week2;
    }

    @Override
    public Calendar getStartOfWeek(int year, int weekNumber) {
        Calendar calendar = Calendar.getInstance();
        calendar.clear();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.WEEK_OF_YEAR, weekNumber);
        calendar.set(Calendar.DAY_OF_WEEK, calendar.getFirstDayOfWeek());
        return calendar;
    }

    @Override
    public Calendar getEndOfWeek(int year, int weekNumber) {
        Calendar calendar = getStartOfWeek(year, weekNumber);
        calendar.add(Calendar.DAY_OF_WEEK, 6);
        return calendar;
    }

    @Override
    public List<Calendar> getDaysInWeek(int year, int weekNumber) {
        List<Calendar> daysOfWeek = new ArrayList<>();
        Calendar currDate = getStartOfWeek(year, weekNumber);
        for (int i = 0; i < 7; i++) {
            Calendar day = (Calendar) currDate.clone();
            daysOfWeek.add(day);
            currDate.add(Calendar.DATE, 1);
        }
        return daysOfWeek;
    }

    @Override
    public List<Long> getEpochDaysInWeek(int year, int weekNumber) {
        List<Calendar> daysOfWeek = getDaysInWeek(year, weekNumber);
        List<Long> epochDaysOfWeek = new ArrayList<>();
        for (Calendar day : daysOfWeek) {
            epochDaysOfWeek.add(day.getTimeInMillis());
        }
        return epochDaysOfWeek;
    }

    @Override
    public List<Integer> getWeekNumbersInMonth(int year, int month) {
        List<Integer> weekNumbers = new ArrayList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.MONTH, month - 1);
        calendar.set(Calendar.DAY_OF_MONTH, 1);

        int currentWeek = calendar.get(Calendar.WEEK_OF_YEAR);
        while (calendar.get(Calendar.MONTH) == month - 1) {
            if (calendar.get(Calendar.WEEK_OF_YEAR) != currentWeek) {
                weekNumbers.add(currentWeek);
                currentWeek = calendar.get(Calendar.WEEK_OF_YEAR);
            }
            calendar.add(Calendar.DATE, 1);
        }

        weekNumbers.add(currentWeek);
        return weekNumbers;
    }

    @Override
    public String dateFormat(Date date, String format) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        return df.format(date);
    }

    @Override
    public Date beginningOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    @Override
    public Date endOfDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }

    @Override
    public int getCurrentYear() {
        return LocalDateTime.now().getYear();
    }

    @Override
    public int getCurrentWeek() {
        LocalDate now = LocalDate.now();
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        return now.get(weekFields.weekOfYear());
    }

    @Override
    public int getCurrentMonth() {
        return LocalDateTime.now().getMonthValue();
    }
}
