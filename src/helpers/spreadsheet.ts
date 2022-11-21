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
