  function sendLatestPostToChatSpace() {
  const rssUrl = 'http://feeds.feedburner.com/GoogleAppsUpdates';
  const chatWebhookUrl = 'https://chat.googleapis.com/v1/spaces/REPLACE__URL';
 try {
    const rssResponse = UrlFetchApp.fetch(rssUrl);
    const rssContent = rssResponse.getContentText();

    const document = XmlService.parse(rssContent);
    const root = document.getRootElement();
    const atomNamespace = XmlService.getNamespace('http://www.w3.org/2005/Atom');
    const entries = root.getChildren('entry', atomNamespace);

    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    const currentDateString = currentDate.toDateString();

    const matchingEntries = entries.filter((entry) => {
      const titleElement = entry.getChild('title', atomNamespace);
      const title = titleElement ? titleElement.getText().trim() : '';
            

      const publishedElement = entry.getChild('published', atomNamespace);
      const published = publishedElement ? publishedElement.getText().trim() : '';
      const publishedDate = new Date(published);
      const publishedDateString = publishedDate.toDateString();
      const convertedDate = Utilities.formatDate(new Date(published), 'GMT+3', 'yyyy-MM-dd');
      Logger.log(title +"  all  " + published +"  pdate "+publishedDate+ " convt 1111   " + convertedDate );
      return publishedDateString === currentDateString;

    });

    if (matchingEntries.length === 0) {
      Logger.log('No matching posts found for the current date.');
      return;
    }

    matchingEntries.forEach((entry) => {
      const titleElement = entry.getChild('title', atomNamespace);
      const title = titleElement ? titleElement.getText().trim() : '';
       Logger.log(title);
      const contentElement = entry.getChild('content', atomNamespace);
      const content = contentElement ? contentElement.getText().trim() : '';
      const croppedContent = cropContent(content);
      const publishedElement = entry.getChild('published', atomNamespace);
      const published = publishedElement ? publishedElement.getText().trim() : '';
      const publishedVal = new Date(published).toISOString().split('T')[0];
      const link = extractLinkFromEntry(entry);
       Logger.log(link);

      // Create the card payload
      const card = {
        'cards': [{
          'header': {
            'title': title,
            'subtitle': `Published: ${publishedVal}`,
            'imageUrl': 'https://static-00.iconduck.com/assets.00/google-icon-1024x1024-hv1t7wtt.png', // Add the URL of the logo image
            'imageStyle': 'IMAGE' // Specify the image style as 'IMAGE'
          },
          'sections': [{
            'widgets': [{
              'textParagraph': {
                'text': croppedContent
              }
            }]
          }, {
            'widgets': [{
              'buttons': [{
                'textButton': {
                  'text': 'Read more',
                  'onClick': {
                    'openLink': {
                      'url': link
                    }
                  }
                }
              }]
            }]
          }]
        }]
      };

      const options = {
        'method': 'post',
        'headers': {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        'payload': JSON.stringify(card)
      };

      const response = UrlFetchApp.fetch(chatWebhookUrl, options);
     // Logger.log(response);
    });
  } catch (error) {
    Logger.log('Error: ' + error.message);
  }
}

function extractLinkFromEntry(entry) {
  const rawXml = XmlService.getRawFormat().format(entry);
  const regex = /<link\s+rel="alternate"\s+type="text\/html"\s+href="(.*?)"/;
  const match = regex.exec(rawXml);
  if (match && match.length > 1) {
    const link = match[1];
    return link.replace('http://', 'https://');
  }
  return '';
}
function generateLinkFromTitle(title, published) {
  const formattedTitle = title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens

  const date = new Date(published);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `https://workspaceupdates.googleblog.com/${year}/${month}/${formattedTitle}.html`;
}

function cropContent(content) {
  const paragraphs = content.split('&nbsp'); // Split the content into paragraphs

  if (paragraphs.length === 0) {
    return ''; // Return an empty string if there are no paragraphs
  }

  const firstParagraph = paragraphs[0].trim(); // Get the first paragraph
  const formattedContent = firstParagraph.replace(/<a\s+href=/g, ' <a href='); // Add spaces before <a> tags

  return formattedContent;
}
