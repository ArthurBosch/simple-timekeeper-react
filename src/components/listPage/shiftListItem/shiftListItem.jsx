const ShiftListItem = ({ props, toggleShiftInfoFunc }) => {
  const { startTime, endTime } = props;

  const baseDate = new Date(startTime);
  const options = { weekday: "short" };
  const num = baseDate.getDate();
  const day = new Intl.DateTimeFormat("en-US", options).format(baseDate);
  const timeStartToDisplay = baseDate.toString().slice(16, 21);
  const timeEndToDisplay = new Date(endTime).toString().slice(16, 21);

  return (
    <div
      className="shift-list--item"
      onClick={() => {
        toggleShiftInfoFunc(props);
      }}
    >
      <div className="shift-list--date">
        <h4 className="date-number">{num}</h4>
        <span className="date-day">{day}</span>
      </div>
      <div className="shift-list--time">
        <span className="time-start">{timeStartToDisplay}</span>
        <span> - </span>
        <span className="time-end">{timeEndToDisplay}</span>
      </div>
      <div className="shift-list--info">
        <button className="info-button">i</button>
      </div>
    </div>
  );
};

export default ShiftListItem;
