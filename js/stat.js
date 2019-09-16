'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;

var TITLE_X = 215;
var TITLE_Y = 40;
var TITLE_GAP_X = 15;
var TITLE_GAP_Y = 20;

var BAR_WIDTH = 40;
var BAR_Y = 90;
var BAR_GAP = 50;

var PLAYER_NAME_GAP_Y = 5;
var FONT_GAP = 30;

var MAX_BAR_HEIGHT = CLOUD_HEIGHT - FONT_GAP - BAR_Y;

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {

  if (names.length !== times.length) {
    if (names.length > times.length) {
      names.length = times.length;
    } else {
      times.length = names.length;
    }
  }

  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y * 2, 'rgba(0, 0, 0, 0.7)');

  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', TITLE_X + TITLE_GAP_X, TITLE_Y);
  ctx.fillText('Список результатов:', TITLE_X, TITLE_Y + TITLE_GAP_Y);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.round((MAX_BAR_HEIGHT * times[i]) / maxTime);
    var barColor = 'hsl(240, ' + Math.round(Math.random() * 100) + '%, 50%';

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    ctx.fillStyle = barColor;
    ctx.fillRect(CLOUD_X + (BAR_WIDTH * i) + (BAR_GAP * (i + 1)),
        BAR_Y + (MAX_BAR_HEIGHT - barHeight),
        BAR_WIDTH,
        barHeight);

    ctx.fillStyle = '#000000';
    ctx.fillText(names[i],
        CLOUD_X + (BAR_WIDTH * i) + (BAR_GAP * (i + 1)),
        CLOUD_HEIGHT - PLAYER_NAME_GAP_Y);
    ctx.fillText(Math.round(times[i]),
        CLOUD_X + (BAR_WIDTH * i) + (BAR_GAP * (i + 1)),
        BAR_Y + (MAX_BAR_HEIGHT - barHeight) - PLAYER_NAME_GAP_Y);
  }
};
