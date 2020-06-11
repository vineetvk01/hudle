import db from '../db/default';

export const insert = async ({ name, industry, website, imageUrl }) => {
  const insertedCompany = await db.query('INSERT INTO company ( name, industry, website, image_url ) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, industry, website, imageUrl]
  );
  return insertedCompany.rows[0];
}

export const select = async ({ name, website }) => {
  const selectedCompany = await db.query('SELECT id, name, industry, website, image_url FROM company WHERE name = $1 AND website = $2',
    [name, website]
  );
  return selectedCompany.rows[0] || {};
}
