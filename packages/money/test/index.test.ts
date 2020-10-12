import {
  PersonBuilder,
  Baht,
  USDollar,
  MonthlyTransaction,
  YearlyTransaction,
  FinanceComparisionBuilder,
  MoneyUnits,
  Datetime,
  Split,
  Discount,
} from "../src";
import { ReportDuration } from "../src/models/datetime/ReportDuration";

// -----------------------------------------
// Import section END ----------------------
// -----------------------------------------

const startDate = new Datetime({ day: 1, month: 1, year: 2020 });

// const salary = new Salary(new Baht(52875), 28)
//   .apply(new SocialSecurity(5))
//   .apply(new ProvidentFund(10))
//   .apply(new Baht(1482.08));

const icloud = new MonthlyTransaction("iCloud", new Baht(99), 9);
const savingKcNt = new MonthlyTransaction("Saving KcNt", new Baht(1000), 1);
const travelingKcNt = new MonthlyTransaction("Traveling KcNt", new Baht(2000), 1);
const bts = new MonthlyTransaction("BTS", new Baht(1080), 21);
const setapp = new YearlyTransaction("Setapp", new USDollar(107.88), 21, 4);
const kamontatDomain = new YearlyTransaction("Kamontat Domain", new USDollar(15.16), 25, 1);
const kamontatInDomain = new YearlyTransaction("Kamontat in Domain", new USDollar(9.88), 11, 4);
const onePassword = new MonthlyTransaction("1Password", new USDollar(2.99), 4);
const grammarly = new YearlyTransaction("Grammarly", new USDollar(139.95), 7, 1);
const dtac = new MonthlyTransaction("Dtac", new Baht(1603.93), 16);

// const dailyUse = new DailyTransaction("Daily use", new Baht(500));

// ----------------------------
// Plan
// ----------------------------

const office365 = new MonthlyTransaction("Microsoft 365 Business Basic", new USDollar(2.5), 15);

const fantastical = new MonthlyTransaction("Fantastical", new Baht(149), 15);
// const fantastical = new YearlyTransaction("Fantastical", new Baht(1220), 15, 4);

// const anydo = new MonthlyTransaction("Any.do", new Baht(189), 15);
// const anydo = new MonthlyTransaction("Any.do", new Baht(91.67), 15); // billing annually

const moneyCouch = new MonthlyTransaction("Money Couch", new Baht(109), 15);
// const moneyCouch = new YearlyTransaction("Money Couch", new Baht(839), 15, 4)

const kcntCCDomain = new YearlyTransaction("kcnt.cc Domain", new USDollar(9.88), 15, 4);
// const kcntLinkDomain = new YearlyTransaction("kcnt.link Domain", new USDollar(8.88), 15, 4);

const comparision = FinanceComparisionBuilder.new()
  .withDebugMode()
  .addPersonBuilder(
    PersonBuilder.new("Current")
      .onDebugMode()
      .withBaseMoney(Baht.zero())
      .addTransaction(icloud)
      .addTransaction(savingKcNt)
      .addTransaction(travelingKcNt)
      .addTransaction(bts)
      .addTransaction(kamontatDomain)
      .addTransaction(kamontatInDomain)
      .addTransaction(onePassword.apply(new Split(2))) // 2 person
      .addTransaction(setapp.apply(new Split(2)))
      .addTransaction(grammarly.apply(new Discount(46.40943194)).apply(new Split(2)))
      .addTransaction(dtac)
  )
  .addPersonBuilder(
    PersonBuilder.new("Expected")
      .onDebugMode()
      .withBaseMoney(Baht.zero())
      .addTransaction(icloud)
      .addTransaction(savingKcNt)
      .addTransaction(travelingKcNt)
      .addTransaction(bts)
      .addTransaction(kamontatDomain)
      .addTransaction(kamontatInDomain)
      .addTransaction(kcntCCDomain.apply(new Split(2)))
      .addTransaction(onePassword.copy(undefined, new USDollar(4.99)).apply(new Split(3))) // 3 person
      .addTransaction(setapp)
      // .addTransaction(grammarly.apply(new Discount(46.40943194)).apply(new Split(2)))
      .addTransaction(dtac.copy(undefined, new Baht(1000)))
      .addTransaction(office365)
      .addTransaction(fantastical)
      .addTransaction(moneyCouch)
  )
  .build();

const result = comparision.compareMonthly("Expected", "Current", ReportDuration.oneYear(startDate));

console.log(result.first.convert(MoneyUnits.THB));
console.log(result.second.convert(MoneyUnits.THB));
console.log(result.diff.convert(MoneyUnits.THB));
console.log(result.percent);
