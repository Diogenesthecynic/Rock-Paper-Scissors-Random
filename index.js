$(document).ready((function (schema) {
    var gameStates = {
            "loading": 0,
            "inactive": 1,
            "counting": 2,
            "complete": 3
        },

        gameState = gameStates.loading,

        delays = schema.delays || 700,

        queries = schema.queries || {},

        elementNames = [
            "display", "action", "small", "commands", "rock", "paper", "scissors"
        ],

        elements;


    /**
     * 
     */
    function reset() {
        elements = findElements();

        elements.action.click(clickGo);
        elements.small.click(clickGo);
    };


    /* Interactivity
    */

    /**
     * 
     */
    function clickGo() {
        elements.action
            .text("?")
            .unbind("click")

        elements.small
            .css("opacity", 0)
            .unbind("click");

        advanceShaking(
            ["action", "rock", "paper", "scissors"],
            0,
            delays,
            displaySolution
        );
    }

    /**
     * 
     */
    function advanceShaking(names, i, delay, callback) {
        if (i > 0) {
            elements[names[i - 1]]
                .dequeue()
                .removeClass("active");

            if (i >= names.length) {
                return callback();
            }
        }

        elements[names[i]]
            .addClass("active")
            .delay(delay)
            .queue(advanceShaking.bind(this, names, i + 1, delay, callback));
    }

    /**
     * 
     */
    function displaySolution() {
        var choice = generateChoice();

        elements.action
            .text(generateChoice() + "!")
            .click(clickGo);

        elements.small
            .css("opacity", 1)
            .text("Go again?")
            .click(clickGo);
    }


    /* Utilities
    */


    /**
     * 
     */
    function findElements() {
        var output = {},
            name, i;

        for (i = 0; i < elementNames.length; i += 1) {
            name = elementNames[i];
            output[name] = $(queries[name] || ("#" + name));
        }

        return output;
    }

    /**
     * 
     */
    function generateChoice() {
        return ["Rock", "Paper", "Scissors"][(Math.random() * 3) | 0];
    }


    reset();
})({

}));