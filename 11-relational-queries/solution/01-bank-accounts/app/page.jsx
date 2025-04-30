import * as stats from "@/repos/stats";

export default async function Home() {
  return (
    <table>
      <tr>
        <th>Average account balance</th>
        <td>{JSON.stringify(await stats.getAccountBalanceAvg())}</td>
      </tr>
      <tr>
        <th>Min/max accounts</th>
        <td>{JSON.stringify(await stats.getAccountMinMax())}</td>
      </tr>
      <tr>
        <th>Top 3 accounts</th>
        <td>{JSON.stringify(await stats.getAccountTop3())}</td>
      </tr>
      <tr>
        <th>Top client</th>
        <td>{JSON.stringify(await stats.getClientTop())}</td>
      </tr>
    </table>
  );
}
