// import React from "react";
import Link from "next/link";

export default async function Page({ params }) {
  const { slug } = await params;
  let region, subregion, country;

  if (slug?.length > 0) {
    region = decodeURI(slug[0]);

    if (slug?.length > 1) {
      subregion = decodeURI(slug[1]);

      if (slug?.length > 2) {
        country = decodeURI(slug[2]);
      }
    }
  }

  // [region, subregion, country] = slug;

  const resource = "http://localhost:3000/v3.1/all.json";
  // const resource = "https://restcountries.com/v3.1/all";

  const res = await fetch(resource);
  let data = [];
  if (res.ok) {
    data = await res.json();
  }

  const tree = {};
  data.forEach((c) => {
    // if (c.subregion === undefined) {
    if (!c?.subregion) {
      c.subregion = "—";
    }

    if (!(c.region in tree)) {
      tree[c.region] = {};
    }

    if (!(c.subregion in tree[c.region])) {
      tree[c.region][c.subregion] = {};
    }

    tree[c.region][c.subregion][c.name.common] = c;
  });

  let regions, subregions, countries, facts;

  regions = Object.keys(tree).sort();
  if (region) {
    subregions = Object.keys(tree[region]).sort();

    if (subregion) {
      countries = Object.keys(tree[region][subregion]).sort();

      if (country) {
        facts = tree[region][subregion][country];
      }
    }
  }

  return (
    <div>
      <nav className="flex flex-wrap gap-x-2 text-2xl">
        {regions.map((r) => (
          <Link
            key={r}
            className={r === region ? "underline" : ""}
            href={`/${encodeURI(r)}`}
          >
            {r}
          </Link>
        ))}
      </nav>
      <nav className="flex flex-wrap gap-x-2 text-lg mt-3">
        {subregions &&
          subregions.map((s) => (
            <Link
              key={s}
              className={s === subregion ? "underline" : ""}
              href={`/${encodeURI(region)}/${encodeURI(s)}`}
            >
              {s}
            </Link>
          ))}
      </nav>
      <nav className="flex flex-wrap gap-x-2 text-md mt-1">
        {countries &&
          countries.map((c) => (
            <Link
              key={c}
              className={c === country ? "underline" : ""}
              href={`/${encodeURI(region)}/${encodeURI(subregion)}/${encodeURI(
                c
              )}`}
            >
              {c}
            </Link>
          ))}
      </nav>
      {facts && (
        <table className="mt-4">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{facts.name.common}</td>
            </tr>
          </tbody>
        </table>
      )}

      {/* <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Default
      </button>
      <button
        type="button"
        class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Alternative
      </button>
      <button
        type="button"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Dark
      </button>
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Light
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Green
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Red
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        Yellow
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        Purple
      </button> */}
    </div>
  );
}

export async function generateStaticParams() {
  const resource = "http://localhost:3000/v3.1/all.json";
  // const resource = "https://restcountries.com/v3.1/all";

  const res = await fetch(resource);
  let data = [];
  if (res.ok) {
    data = await res.json();
  }

  const paths = [{ slug: [] }];
  const tree = {};
  data.forEach((c) => {
    // if (c.subregion === undefined) {
    if (!c?.subregion) {
      c.subregion = "—";
    }

    if (!(c.region in tree)) {
      tree[c.region] = {};
      paths.push({ slug: [c.region] });
    }

    if (!(c.subregion in tree[c.region])) {
      tree[c.region][c.subregion] = {};
      paths.push({ slug: [c.region, c.subregion] });
    }

    tree[c.region][c.subregion][c.name.common] = c;
    paths.push({
      slug: [c.region, c.subregion, c.name.common],
    });
  });

  return paths;
}
