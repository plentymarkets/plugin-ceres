module.exports = (function($)
{

    let paused  = false;
    let timeout = -1;
    let interval;
    let timeRemaining;
    let timeStart;

    return {
        findModal: findModal
    };

    function findModal(element)
    {
        return new Modal(element);
    }

    function Modal(element)
    {
        const self = this;
        let $bsModal;

        if ($(element).is(".modal"))
        {
            $bsModal = $(element);
        }
        else
        {
            $bsModal = $(element).find(".modal").first();
        }

        return {
            show             : show,
            hide             : hide,
            setTimeout       : setTimeout,
            startTimeout     : startTimeout,
            pauseTimeout     : pauseTimeout,
            continueTimeout  : continueTimeout,
            stopTimeout      : stopTimeout,
            getModalContainer: getModalContainer,
            on               : on
        };

        function show()
        {
            return new Promise((resolve, reject) =>
            {
                $bsModal.modal("show");

                if ($bsModal.timeout > 0)
                {
                    startTimeout();
                }

                $bsModal.one("shown.bs.modal", function()
                {
                    resolve(self);
                });

            });
        }

        function hide()
        {
            return new Promise((resolve, reject) =>
            {
                $bsModal.modal("hide");
                $bsModal.one("hidden.bs.modal", function()
                {
                    resolve(self);
                });
            });
        }

        function getModalContainer()
        {
            return $bsModal;
        }

        function setTimeout(timeout)
        {
            $bsModal.timeout = timeout;

            $bsModal.find(".modal-content").mouseover(function()
            {
                pauseTimeout();
            });

            $bsModal.find(".modal-content").mouseout(function()
            {
                continueTimeout();
            });

            return this;
        }

        function startTimeout()
        {
            timeRemaining = $bsModal.timeout;
            timeStart = (new Date()).getTime();

            timeout = window.setTimeout(function()
            {
                window.clearInterval(interval);
                hide();
            }, $bsModal.timeout);

            $bsModal.find(".timer").text(timeRemaining / 1000);
            interval = window.setInterval(function()
            {
                if (!paused)
                {
                    let secondsRemaining = timeRemaining - (new Date()).getTime() + timeStart;

                    secondsRemaining = Math.round(secondsRemaining / 1000);
                    $bsModal.find(".timer").text(secondsRemaining);
                }
            }, 1000);
        }

        function pauseTimeout()
        {
            paused = true;
            timeRemaining -= (new Date()).getTime() - timeStart;
            window.clearTimeout(timeout);
        }

        function continueTimeout()
        {
            paused = false;
            timeStart = (new Date()).getTime();
            timeout = window.setTimeout(function()
            {
                hide();
                window.clearInterval(interval);
            }, timeRemaining);
        }

        function stopTimeout()
        {
            window.clearTimeout(timeout);
            window.clearInterval(interval);
        }

        function on(event, callback)
        {
            $bsModal.on(event, callback);
        }
    }
})(jQuery);
