import { useCallback, useState } from "react";

import { colors } from "@/config";
import { CheckboxItem } from "@/components/generic";

export const ListOfItems = ({
  items,
  filterByText,
}: {
  items: {
    name: string;
    practice: string;
    amount_of_jobs: number;
    id: number;
  }[];
  filterByText: string;
}) => {
  const [itemsChecked, setItemsChecked] = useState<{ [id: number]: boolean }>(
    items.reduce((acc, { id }) => ({ ...acc, [id]: false }), {})
  );

  const filteredItemsByText = items.filter(({ name, practice }) =>
    `${name} ${practice}`.toLowerCase().includes(filterByText.toLowerCase())
  );

  const atLeastOneChecked = Object.keys(itemsChecked).some(
    (key) => itemsChecked[key as unknown as number]
  );
  const areAllChecked = Object.keys(itemsChecked).every(
    (key) => itemsChecked[key as unknown as number]
  );

  const setAllItemsChecked = useCallback(
    (checked: boolean) => {
      setItemsChecked(
        items.reduce((acc, { id }) => ({ ...acc, [id]: checked }), {})
      );
    },
    [items]
  );

  return (
    <div className="flex flex-1 flex-col overflow-y-scroll">
      <div className="flex">
        <div className="flex flex-1">
          <CheckboxItem
            label={<b>All</b>}
            labelColor={colors.secondary}
            checkboxProps={{
              checked: areAllChecked,
              checkedIsIndeterminate: !areAllChecked && atLeastOneChecked,
              onCheckedChange: (allChecked) => setAllItemsChecked(allChecked),
            }}
          />
        </div>
        <b className="w-12 mx-3" style={{ color: colors.secondary }}>
          Jobs
        </b>
      </div>
      <div className="flex flex-1 flex-col overflow-y-scroll">
        {filteredItemsByText.map(
          ({ amount_of_jobs, name, practice, id }, index) => (
            <div key={index} className="flex mt-2">
              <div className="flex flex-1">
                <CheckboxItem
                  label={`${name} - ${practice}`}
                  checkboxProps={{
                    checked: itemsChecked[id],
                    onCheckedChange: () =>
                      setItemsChecked({
                        ...itemsChecked,
                        [id]: !itemsChecked[id],
                      }),
                  }}
                />
              </div>
              <div className="px-2 flex items-center">
                <p
                  className="w-12 text-center"
                  style={{ color: colors.secondary }}
                >
                  ({amount_of_jobs > 99 ? "99+" : amount_of_jobs})
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
