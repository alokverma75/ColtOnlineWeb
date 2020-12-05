set PERCY_TOKEN=8001ff496f69733608fac03b122efb4bad02328d0f7656071248b2aef49e6da7
npx percy exec --config percy.json -- npx cypress run --spec \"cypress/integration/OnlineWeb/* \" --record --key 43618d7a-1fb6-46fd-9b2d-a4079b224091 --reporter mochawesome
