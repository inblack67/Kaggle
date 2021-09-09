/*
  Warnings:

  - A unique constraint covering the columns `[country_or_area]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Country_country_or_area_key" ON "Country"("country_or_area");
