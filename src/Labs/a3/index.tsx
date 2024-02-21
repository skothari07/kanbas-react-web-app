import DynamicStyling from "./Classes/DynamicStyling";
import ConditionalOutput from "./ConditionalOutput";
import JavaScript from "./JavaScript";
import Styles from "./Styles";
import PathParameters from "./routing/PathParameters";
import Highlight from "../../Highlight";
import Add from "./Add";
import TodoList from "./todos/TodoList";

function Assignment3() {
    return (
        <div>
            <h1>Assignment 3</h1>
            <TodoList />
            <Add a={3} b={4} />
            <Highlight>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
            </Highlight>
            <ConditionalOutput />
            <Styles />
            <DynamicStyling />
            <PathParameters />
            <JavaScript />
        </div>
    );
    }
    export default Assignment3;