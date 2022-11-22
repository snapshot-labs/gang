export async function getSpreadsheet(url) {
  const text = await fetch(url).then(res => res.text());
  const json = JSON.parse(
    text
      .replace('/*O_o*/\ngoogle.visualization.Query.setResponse(', '')
      .slice(0, -2)
  );
  const rows = json.table.rows;
  const columns = rows[0].c.filter(c => !!c?.v).map(c => c.v);
  return rows
    .slice(1)
    .map(row =>
      Object.fromEntries(row.c.map((c, i) => [columns[i], c?.v || null]))
    );
}

export async function getCalendar(url) {
  const date = new Date();
  const timeMin = date.toISOString();
  date.setDate(date.getDate() + 30);
  const timeMax = date.toISOString();
  url = `https://clients6.google.com/calendar/v3/calendars/c_o9gndn4n4hmcsbthvkplgrlegs@group.calendar.google.com/events?calendarId=c_o9gndn4n4hmcsbthvkplgrlegs%40group.calendar.google.com&singleEvents=true&orderBy=startTime&maxResults=50&sanitizeHtml=true&timeMin=${timeMin}&timeMax=${timeMax}&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`;

  let { items } = await fetch(url).then(res => res.json());

  items = items.map(item => {
    item.start.ts = parseInt(
      (
        new Date(
          new Date(item.start.dateTime).toLocaleString('en-US', {
            timeZone: item.start.timeZone
          })
        ).getTime() / 1e3
      ).toFixed()
    );
    item.end.ts = parseInt(
      (
        new Date(
          new Date(item.end.dateTime).toLocaleString('en-US', {
            timeZone: item.end.timeZone
          })
        ).getTime() / 1e3
      ).toFixed()
    );

    return item;
  });

  return items;
}
