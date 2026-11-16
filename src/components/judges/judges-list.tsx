import { JudgeCard, TJudge } from "./judge-card";

export const JudgesList = ({
  judges,
  descriptionMaxLength = 120,
}: {
  judges: TJudge[];
  descriptionMaxLength?: number;
}) => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center items-stretch gap-3">
      {judges.map((judge) => (
        <JudgeCard
          key={judge.name}
          judge={judge}
          maxLength={descriptionMaxLength}
        />
      ))}
    </div>
  );
};

export default JudgesList;
