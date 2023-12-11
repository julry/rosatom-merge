import { useProgress } from "../../../hooks/useProgress";
import { MergeGame } from "../../shared/merge-game";
import { cards, results } from "./constants";

export const Screen3 = () => {
    const {next} = useProgress();
    
    return (
        <MergeGame 
            cards={cards} 
            results={results} 
            isShownDarken
            onFinish={next}
            initialTime={150}
        />
    );
};
