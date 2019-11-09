(function () {
    Type.registerNamespace("ConsoleDebug");

    ConsoleDebug = {
        Show: function (message) {
            if (this.ShowMethod) {
                this.ShowMethod(message);
            }
        },
        ShowMethod: null
    };
})();