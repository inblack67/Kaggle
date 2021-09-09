-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "country_or_area" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "category" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
