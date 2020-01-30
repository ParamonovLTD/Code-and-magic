'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 280;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 15;
var TEXT_HEIGHT = 16;
var COLUMN_WIDTH = 40;
var COLUMN_HEIGHT = 150;
var COLUMN_GAP = 50;
var PLAYER_X = 50;
var PLAYER_Y = 250;
var randomBlueColor;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxTime = function (times) {
  var maxTime = Math.max.apply(null, times);
  return maxTime;
};

var renderColumn = function (ctx, x, y, columnHeight) {
  ctx.fillRect(x, y, COLUMN_WIDTH, columnHeight);
};

var renderResult = function (ctx, playerName, playerNumber, color, columnHeight, playerResult) {
  ctx.fillText(playerName, CLOUD_X + PLAYER_X + (COLUMN_WIDTH + COLUMN_GAP) * (playerNumber - 1), PLAYER_Y);
  ctx.fillStyle = color;
  renderColumn(ctx, CLOUD_X + PLAYER_X + (COLUMN_WIDTH + COLUMN_GAP) * (playerNumber - 1), CLOUD_HEIGHT - GAP - TEXT_HEIGHT - TEXT_GAP - columnHeight, columnHeight);
  ctx.fillStyle = '#000';
  ctx.fillText(playerResult, CLOUD_X + PLAYER_X + (COLUMN_WIDTH + COLUMN_GAP) * (playerNumber - 1), CLOUD_HEIGHT - GAP - TEXT_HEIGHT - TEXT_GAP * 2 - columnHeight);
};

var getRandomBlueColor = function () {
  var randomBlueSaturation = Math.random() * 100 + '%';
  randomBlueColor = 'hsl(230, ' + randomBlueSaturation + ', 50%)';

  return randomBlueColor;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  ctx.fillStyle = '#000';
  ctx.font = TEXT_HEIGHT + 'px PTMono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + PLAYER_X, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов: ', CLOUD_X + PLAYER_X, CLOUD_Y + GAP * 2.5 + TEXT_HEIGHT);

  // renderResult(ctx, 'Вы', 1, 'rgba(255, 0, 0, 1)', 120, '2725');

  for (var i = 0; i < names.length; i++) {
    var getColumnColor = function () {
      if (names[i] === 'Вы') {
        return 'rgba(255, 0, 0, 1)';
      } else {
        return getRandomBlueColor();
      }
    };

    renderResult(ctx, names[i], i + 1, getColumnColor(), (COLUMN_HEIGHT * times[i]) / getMaxTime(times), Math.floor(times[i]));
  }


  // renderResult(ctx, 'Вы', 1, 'rgba(255, 0, 0, 1)', 120, '2725');

  // renderResult(ctx, 'Кекс', 2, getRandomBlueColor(), 80, '2001');

  // renderResult(ctx, 'Катя', 3, getRandomBlueColor(), 30, '1052');

  // renderResult(ctx, 'Игорь', 4, getRandomBlueColor(), 100, '2497');
  // ctx.fillText ('Вы', 120, 240);
  // ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  // renderColumn (ctx, 120, 105, 120);
  // ctx.fillStyle = '#000';
  // ctx.fillText ('2725', 120, 85);

  // ctx.fillText ('Кекс', COLUMN_WIDTH + 170, 240);
  // ctx.fillStyle = 'hsl(230, 50%, 50%)';
  // renderColumn (ctx, COLUMN_WIDTH + 170, 145, 80);
  // ctx.fillStyle = '#000';
  // ctx.fillText ('2001', COLUMN_WIDTH + 170, 125);

  // ctx.fillText ('Катя', COLUMN_WIDTH * 2 + 220, 240);
  // ctx.fillStyle = 'hsl(230, 20%, 50%)';
  // renderColumn (ctx, COLUMN_WIDTH * 2 + 220, 195, 30);
  // ctx.fillStyle = '#000';
  // ctx.fillText ('1052', COLUMN_WIDTH * 2 + 220, 175);

  // ctx.fillText ('Игорь', COLUMN_WIDTH * 3 + 270, 240);
  // ctx.fillStyle = 'hsl(230, 70%, 50%)';
  // renderColumn (ctx, COLUMN_WIDTH * 3 + 270, 125, 100);
  // ctx.fillStyle = '#000';
  // ctx.fillText ('2497', COLUMN_WIDTH * 3 + 270, 105);
};
