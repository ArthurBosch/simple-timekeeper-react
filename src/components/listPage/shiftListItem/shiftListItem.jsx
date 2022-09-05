const ShiftListItem = ({ props }) => {
  const { num, day, shiftStart, shiftEnd } = props;

  return (
    <div className="shift-list--item">
      <div className="shift-list--date">
        <h4 className="date-number">{num}</h4>
        <span className="date-day">{day}</span>
      </div>
      <div className="shift-list--time">
        <span className="time-start">{shiftStart}</span>
        <span> - </span>
        <span className="time-end">{shiftEnd}</span>
      </div>
      <div className="shift-list--info">
        <button className="info-button">i</button>
      </div>
    </div>
  );
};

export default ShiftListItem;
