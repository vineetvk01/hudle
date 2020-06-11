import db from '../db/default';

export const insert = async ({ firstName, lastName, email, password, gender, type, createdAt, lastLoginAt }) => {
  const createdAtUTC = new Date(createdAt).toUTCString();
  const lastLoginAtUTC = new Date(lastLoginAt).toUTCString();

  const insertedUser = await db.query('INSERT INTO login (first_name, last_name, email, password, gender, kind, created_at, last_login_at ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [firstName, lastName, email, password, gender, type, createdAtUTC, lastLoginAtUTC]
  );
  
  return insertedUser.rows[0];
}

export const select = async ({email, password}) => {
  const fetchedUsers = await db.query('SELECT id, first_name, last_name, email, gender, kind, created_at FROM login WHERE email = $1 AND password = $2', 
    [email, password]
  );
  const user = fetchedUsers.rows[0];
  if(user){
    user.type = user.kind;
    delete user.kind;
  }
  return user;
}
