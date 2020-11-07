import React from 'react';
import path from 'path';
import {renderToString} from 'react-dom/server';
import {ChunkExtractor, ChunkExtractorManager} from "@loadable/server";
import { SomeComponent } from './';

const server = (cb, url, data) => {
	const context = {data};
	const extractor = new ChunkExtractor({
		statsFile: path.resolve(__dirname, 'loadable-stats.json'),
		entrypoints: ['client'],
	});
	const markup = renderToString(
		<ChunkExtractorManager extractor={extractor}>
                  <SomeComponent />
		</ChunkExtractorManager>
	);

	const scriptTags = extractor.getScriptTags();
	const linkTags = extractor.getLinkTags();
	const styleTags = extractor.getStyleTags();

	cb(null, `<!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script>window.__ROUTE_DATA__=${JSON.stringify(data)}</script>
          ${linkTags}
          ${styleTags}
      </head>
      <body>
          <div id="root">${markup}</div>
          ${scriptTags}
      </body>
    </html>`);
}

export default server;
