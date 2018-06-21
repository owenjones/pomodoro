var workTime = 0;
var intervalTime = 0;
var iterations = 0;

var itercount = 1;
var interval = false;
var stopped = false;

function init() {
  workTime = Number($("#i-work")[0].value);
  intervalTime = Number($("#i-int")[0].value);
  iterations = Number($("#i-rep")[0].value);

  max = (iterations > 0) ? iterations.toString() : "&infin;";
  $("#maxint").html(max);
  $("#current").text("1");
  $("#clock").text(workTime.toString() + ":00");

  $("#setup").fadeOut(350, 'linear', function() {
    $("#timer").fadeIn(350, 'linear', function() {
      startClock()
    })
  });
}

function finish() {
  removeClock();
  interval = false;
  itercount = 1;
  $("#timer").fadeOut(350, 'linear', function() {
    $("body").switchClass("interval", "work", 350, 'linear');
    $("#clock").switchClass("interval", "work", 350, 'linear', function() {
      $("#setup").fadeIn(350, 'linear')
    });
  });
}

function startClock() {
  t = (interval) ? intervalTime : workTime;
  $("#clock").timer({
    countdown: true,
    duration: t.toString() + "m",
    format: "%M:%S",
    callback: changeMode})
}

function removeClock() {
  $("#clock").timer('remove');
}

function changeMode() {
  if(interval) {
    itercount += 1;
    if((itercount > iterations) && (iterations != 0)) {
      return finish();
    }
  }

  active = (interval) ? "work" : "interval";
  inactive = (interval) ? "interval" : "work";
  $("#alarm")[0].play();
  removeClock();
  $("#current").text(itercount.toString());
  interval = !interval;
  $("body").switchClass(inactive, active, 450, 'linear');
  $("#clock").switchClass(inactive, active, 450, 'linear', function() {
    startClock();
  });
}

$(document).ready(function() {
  $("input[type='number']").on("focus", function () {
    $(this).select();
  });

  $("#inputfields").submit(function(event) {
    document.activeElement.blur();
    event.preventDefault();
    init();
  });

  $("#restart").click(function(event) {
    removeClock();
    startClock();
  });

  $("#startstop").click(function(event) {
    if(stopped) {
      $("#startstop").text("Pause");
      $("#clock").timer('resume')
    } else {
      $("#startstop").text("Resume");
      $("#clock").timer('pause')
    }
    stopped = !stopped;
  });

  $("#back").click(function(event) {
    finish();
  });
});
