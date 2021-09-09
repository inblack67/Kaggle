import data from '../../data.json';
import { getMyPrismaClient } from '../db';
import { IData } from '../interfaces';

export const populateDB = async () => {
  try {
    const prisma = getMyPrismaClient();

    const firstCountry = await prisma.country.findFirst({
      select: { id: true },
    });

    if (firstCountry) {
      console.log(`db is already populated, returning...`);
      return;
    }

    const countries: IData[] = data;
    await prisma.country.createMany({
      data: countries,
    });
    console.log(`db populated`);
  } catch (err) {
    console.log(`Error populating the db...`);
    console.error(err);
  }
};

populateDB();
