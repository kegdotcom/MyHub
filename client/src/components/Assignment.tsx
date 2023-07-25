import FinalTaskObj from "./AssignmentTypes";

interface AssignmentProps {
  assignment: FinalTaskObj;
  onUpdate: () => void;
}

export default function AssignmentItem({
  assignment,
  onUpdate,
}: AssignmentProps) {
  const formatDate = (d: string) => {
    const full = new Date(d);

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const formattedDate = `${days[full.getDay()]}, ${
      months[full.getMonth()]
    } ${full.getDate()}, ${full.getFullYear()}`;
    return formattedDate;
  };

  const formatTime = (t: string) => {
    const full = new Date(t);

    const formattedTime = `${full.toLocaleTimeString().split(":")[0]}:${
      full.toLocaleTimeString().split(":")[1]
    } ${full.toLocaleTimeString().split(" ")[1]}`;
    return formattedTime;
  };

  return (
    <tr>
      <td className="text-capitalize col-1">{assignment.courseID}</td>
      <td className="text-capitalize col-1">{assignment.type}</td>
      <td className="text-capitalize col-4">
        <a href={assignment.url}>
          {(assignment.locked ? "[LOCKED]" : "") + assignment.name}
        </a>
      </td>
      <td className="col-1">{assignment.points}</td>
      <td className="col-2">{formatDate(assignment.dueDate)}</td>
      <td className="col-1">{formatTime(assignment.dueDate)}</td>
    </tr>
  );
}
