import DropdownInput from "./DropdownInput";
import Switch from "./Switch";
import NumberInput from "./NumberInput";
import {
  anytime,
  getCalendarRows,
  Month,
  SingleDate,
  monthAbbr,
  weekdayAbbr,
  DateRange,
} from "../modules/dates";
import { useState } from "react";
import { range } from "../modules/utils";
import { optionStyles, selectedOptionStyles } from "../modules/styles";

export default function FlexibleDateDropdownInput({ ...baseProps }) {
  return <DropdownInput input={FlexibleDateInput} {...baseProps} />;
}

function FlexibleDateInput({ field, value, onChange, ...attributes }) {
  const [dateType, setDateType] = useState(value.constructor.name);

  function handleDateTypeChange(e) {
    setDateType(e.newValue);
    if (e.newValue === "Anytime") {
      onChange({ newValue: anytime });
    }
  }

  return (
    <div
      css={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      {...attributes}
    >
      <Switch
        items={[
          { value: "Anytime", label: "Anytime" },
          { value: "Month", label: "Month" },
          { value: "SingleDate", label: "Date" },
          { value: "DateRange", label: "Range" },
        ]}
        value={dateType}
        onChange={handleDateTypeChange}
      />
      {dateType == "Month" && (
        <MonthSelector value={value} onChange={onChange} />
      )}
      {dateType == "SingleDate" && (
        <DateSelector value={value} onChange={onChange} />
      )}
      {dateType == "DateRange" && (
        <DateRangeSelector value={value} onChange={onChange} />
      )}
    </div>
  );
}

function MonthSelector({ value, onChange, ...attributes }) {
  const now = new Date();
  const [year, setYear] = useState(
    value && value.year !== undefined ? value.year : now.getFullYear()
  );
  const monthSeparation = "0.5rem";
  const monthsPerRow = 4;

  function handleClick(e) {
    if (onChange) {
      const month = Number(e.currentTarget.value);
      onChange({ newValue: new Month(year, month) });
    }
  }

  return (
    <div
      css={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      {...attributes}
    >
      <NumberInput value={year} onChange={(e) => setYear(e.newValue)} />
      <div css={{ display: "flex", gap: monthSeparation, flexWrap: "wrap" }}>
        {range(1, 13).map((month) => {
          const isSelected =
            value && value.year == year && value.month == month;
          const isCurrentMonth =
            year == now.getFullYear() && month - 1 == now.getMonth();
          return (
            <button
              key={month}
              type="button"
              value={month}
              onClick={handleClick}
              css={[
                {
                  width: `calc((100% - ${monthSeparation} * ${
                    monthsPerRow - 1
                  }) / ${monthsPerRow})`,
                  height: "3rem",
                  border: "none",
                  borderRadius: "0.2rem",
                  fontSize: "0.9rem",
                  position: "relative",
                },
                isSelected ? selectedOptionStyles : optionStyles,
                isCurrentMonth && {
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    right: "0.5rem",
                    top: "0.5rem",
                    width: "0.5rem",
                    height: "0.5rem",
                    borderRadius: "100%",
                    backgroundColor: "white",
                  },
                },
              ]}
            >
              {monthAbbr[month - 1]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateSelector({ value, onChange, ...attributes }) {
  const now = new Date();
  const [year, setYear] = useState(
    value && value.year !== undefined ? value.year : now.getFullYear()
  );
  const [month, setMonth] = useState(
    value && value.month !== undefined ? value.month : now.getMonth() + 1
  );
  return (
    <div
      css={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      {...attributes}
    >
      <div css={{ display: "flex" }}>
        <NumberInput value={year} onChange={(e) => setYear(e.newValue)} />
        <NumberInput
          value={month}
          min={1}
          max={12}
          cycleAround={true}
          onChange={(e) => setMonth(e.newValue)}
        />
      </div>
      <CalendarPage
        year={year}
        month={month}
        isSelected={(date) => value && value.compare(date) == 0}
        onChange={onChange}
      />
    </div>
  );
}

function DateRangeSelector({ value, onChange, ...attributes }) {
  const now = new Date();
  const [startDate, setStartDate] = useState(null);
  const [startYear, setStartYear] = useState(
    value?.start?.year !== undefined ? value.start.year : now.getFullYear()
  );
  const [endYear, setEndYear] = useState(
    value?.end?.year !== undefined ? value.end.year : now.getFullYear()
  );
  const [startMonth, setStartMonth] = useState(
    value?.start?.month !== undefined ? value.start.month : now.getMonth() + 1
  );
  const [endMonth, setEndMonth] = useState(
    value?.end?.month !== undefined ? value.end.month : now.getMonth() + 1
  );

  function handleYearChange(e) {
    startDate ? setEndYear(e.newValue) : setStartYear(e.newValue);
  }

  function handleMonthChange(e) {
    startDate ? setEndMonth(e.newValue) : setStartMonth(e.newValue);
  }

  function handleDaySelected(e) {
    if (startDate) {
      const comparison = startDate.compare(e.newValue);
      if (comparison == 0) {
        setStartDate(null);
        return;
      } else if (comparison < 0) {
        setStartDate(null);
        if (onChange) {
          onChange({
            newValue: new DateRange(startDate, e.newValue),
          });
        }
      }
    } else {
      setStartDate(e.newValue);
    }
  }

  const year = startDate ? endYear : startYear;
  const month = startDate ? endMonth : startMonth;

  return (
    <div
      css={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      {...attributes}
    >
      <div css={{ display: "flex" }}>
        <NumberInput value={year} onChange={handleYearChange} />
        <NumberInput
          value={month}
          min={1}
          max={12}
          cycleAround={true}
          onChange={handleMonthChange}
        />
      </div>
      <CalendarPage
        year={year}
        month={month}
        selectingRange={!!startDate}
        isSelected={(date, hoveredDate) => {
          if (startDate) {
            if (hoveredDate) {
              return startDate.compare(date) <= 0 && hoveredDate >= date;
            } else {
              return startDate.compare(date) == 0;
            }
          } else if (value && value instanceof DateRange) {
            return (
              value.start.compare(date) <= 0 && value.end.compare(date) >= 0
            );
          }
          return false;
        }}
        onChange={handleDaySelected}
      />
    </div>
  );
}

function CalendarPage({
  year,
  month,
  isSelected,
  selectingRange,
  onChange,
  ...attributes
}) {
  const [hoveredDate, setHoveredDate] = useState(null);
  const daySeparation = "0.3rem";
  const cellWidth = `calc((100% - ${daySeparation} * 6) / 7)`;
  return (
    <div
      css={{ display: "flex", flexWrap: "wrap", gap: daySeparation }}
      {...attributes}
    >
      {weekdayAbbr.map((weekday) => (
        <div
          key={weekday}
          css={{
            width: cellWidth,
            fontSize: "0.8rem",
            textAlign: "center",
            color: "#666",
          }}
        >
          {weekday}
        </div>
      ))}
      {getCalendarRows(year, month).map((row) =>
        row.map((date) => {
          const isWeekend = date.getDay() == 6 || date.getDay() == 0;
          const selected = isSelected(date, hoveredDate);
          return (
            <button
              key={date.toString()}
              type="button"
              value={date}
              onMouseOver={(e) => {
                if (selectingRange) {
                  setHoveredDate(date);
                }
              }}
              onClick={(e) => {
                setHoveredDate(null);
                if (onChange) {
                  onChange({ newValue: SingleDate.fromDate(date) });
                }
              }}
              css={[
                {
                  border: "none",
                  borderRadius: "0.2rem",
                  height: "2rem",
                  width: cellWidth,
                },
                selected ? selectedOptionStyles : optionStyles,
                !selected &&
                  date.getMonth() + 1 != month && {
                    opacity: 0.3,
                  },
                !selected &&
                  isWeekend && {
                    backgroundImage: "linear-gradient(to bottom, #bcd, #abc)",
                    boxShadowColor: "#9ab",
                    ":hover": {
                      backgroundImage: "linear-gradient(to bottom, #cde, #bcd)",
                    },
                  },
              ]}
            >
              {date.getDate()}
            </button>
          );
        })
      )}
    </div>
  );
}
