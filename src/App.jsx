import { useMemo, useState } from "react";
import calcProximity from "./functions/calcProximity";
import "./App.scss";

const Item = ({ label, proximity }) => {
    return (
        <div className="resultItem">
            <span>{label}</span>
            <span>{(proximity * 100).toFixed(2)}%</span>
        </div>
    );
};

function App() {
    const [target, setTarget] = useState("");

    const results = useMemo(() => calcProximity(target), [target]);

    return (
        <div id="App">
            <div id="holder">
                <label id="targetHolder">
                    <h3 id="targetLabel">Target:</h3>

                    <input
                        id="target"
                        type="text"
                        onChange={(e) => setTarget(e.target.value)}
                        value={target}
                        placeholder="Name"
                    />
                </label>

                <div id="resultsHolder">
                    <h3 id="resultsLabel">Proximity Results:</h3>

                    <div id="results">
                        {results.map((result, i) => (
                            <Item key={i} label={result.original} proximity={result.proximity} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
