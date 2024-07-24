import React, { useEffect, useState } from "react";

interface CheckedStatus {
  "sheets-status": boolean;
  "beams-status": boolean;
  "bolts-status": boolean;
  "frames-status": boolean;
}

const map: Record<keyof CheckedStatus, string[]> = {
  "sheets-status": ["sheets-station", "beams-station", "frames-station"],
  "beams-status": ["beams-station", "frames-station"],
  "bolts-status": ["bolts-station", "frames-station"],
  "frames-status": ["frames-station"],
};

function App() {
  const [checkedStatus, setCheckedStatus] = useState<CheckedStatus>({
    "sheets-status": true,
    "beams-status": true,
    "bolts-status": true,
    "frames-status": true,
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as keyof CheckedStatus;
    const isChecked = e.target.checked;

    setCheckedStatus((prevStatus) => ({
      ...prevStatus,
      [id]: isChecked,
    }));

    // Reset all dependent elements' background color
    [
      "sheets-station",
      "beams-station",
      "frames-station",
      "bolts-station",
    ].forEach((dependentId: string) => {
      const element = document.getElementById(dependentId);
      if (element) element.style.backgroundColor = "";
    });
  };

  useEffect(() => {
    // Set background color to red for unchecked elements and their dependents
    (Object.keys(checkedStatus) as Array<keyof CheckedStatus>).forEach((id) => {
      if (!checkedStatus[id]) {
        map[id].forEach((dependentId: string) => {
          const element = document.getElementById(dependentId);
          if (element) element.style.backgroundColor = "red";
        });
      }
    });
  }, [checkedStatus]);

  return (
    <div>
      <h3>Control Panel</h3>
      <div>
        <input
          type="checkbox"
          id="sheets-status"
          checked={checkedStatus["sheets-status"]}
          onChange={handleCheck}
        />
        <span id="sheets-station">SHEETS</span>
      </div>
      <div>
        <input
          type="checkbox"
          id="beams-status"
          checked={checkedStatus["beams-status"]}
          onChange={handleCheck}
        />
        <span id="beams-station">BEAMS</span>
      </div>
      <div>
        <input
          type="checkbox"
          id="bolts-status"
          checked={checkedStatus["bolts-status"]}
          onChange={handleCheck}
        />
        <span id="bolts-station">BOLTS</span>
      </div>
      <div>
        <input
          type="checkbox"
          id="frames-status"
          checked={checkedStatus["frames-status"]}
          onChange={handleCheck}
        />
        <span id="frames-station">FRAMES</span>
      </div>
    </div>
  );
}

export default App;
