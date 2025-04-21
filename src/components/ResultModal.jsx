import { createPortal } from "react-dom";

export default function ResultModal({
  ref,
  result,
  targetTime,
  remainingTime,
  onReset,
}) {
  const userLost = remainingTime <= 0;
  const formattedRemaininhgTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((remainingTime / (targetTime * 1000)) * 100);
  return createPortal(
    <dialog ref={ref} className="result-modal" onClose={onReset} >
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score :{score}</h2>}
      <p>
        The target time was <strong>{targetTime} Seconds</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemaininhgTime} seconds left</strong>.
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
}
