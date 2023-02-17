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

  const daySeparation = "0.3rem";
  const cellWidth = `calc((100% - ${daySeparation} * 6) / 7)`;

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
      <div css={{ display: "flex", flexWrap: "wrap", gap: daySeparation }}>
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
            const isSelected =
              value &&
              value.year == date.getFullYear() &&
              value.month == date.getMonth() + 1 &&
              value.day == date.getDate();
            const isWeekend = date.getDay() == 6 || date.getDay() == 0;
            return (
              <button
                key={date.toString()}
                type="button"
                value={date}
                onClick={(e) => {
                  if (onChange) {
                    onChange({
                      newValue: new SingleDate(
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                      ),
                    });
                  }
                }}
                css={[
                  {
                    border: "none",
                    borderRadius: "0.2rem",
                    height: "2rem",
                    width: cellWidth,
                  },
                  isSelected ? selectedOptionStyles : optionStyles,
                  !isSelected &&
                    date.getMonth() + 1 != month && {
                      opacity: 0.3,
                    },
                  !isSelected &&
                    isWeekend && {
                      backgroundImage: "linear-gradient(to bottom, #bcd, #abc)",
                      boxShadowColor: "#9ab",
                      ":hover": {
                        backgroundImage:
                          "linear-gradient(to bottom, #cde, #bcd)",
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
    </div>
  );
}
