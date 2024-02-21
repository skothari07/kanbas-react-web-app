import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";
import BooleanVariables from "./variables/BooleanVariables";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import WorkingWithFunctions from "./functions/WorkingWithFunctions"
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import JsonStringify from "./json/JsonStringify";
import TemplateLiterals from "./string/TemplateLiterals";
import House from "./json/House";

function JavaScript() {
    console.log("Hello World!")

    return(
    <div>
            <h1>JavaScript</h1>
            <House />
            <TemplateLiterals />
            <JsonStringify />
            <WorkingWithArrays />
            <WorkingWithFunctions />
            <TernaryOperator />
            <IfElse />
            <BooleanVariables />
            <VariableTypes />
            <VariablesAndConstants />
    </div>
    );
}
export default JavaScript