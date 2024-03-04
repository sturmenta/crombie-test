import { useCallback, useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, CircularProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";

import { colors } from "@/config";
import { CheckboxItem } from "@/components/generic";
import { useSupabase } from "@/components/generic/supabase";

type PracticeItem_Type = {
  name: string;
  type: string;
  amount_of_jobs: number;
  id: number;
  is_from_backend?: boolean;
};

export const ListOfItems = ({
  items: localItems,
  filterByText,
  showErrorToast,
  setErrorToastMessage,
  showSuccessToast,
  setSuccessToastMessage,
}: {
  items: PracticeItem_Type[];
  filterByText: string;
  showErrorToast: () => void;
  setErrorToastMessage: (message: string) => void;
  showSuccessToast: () => void;
  setSuccessToastMessage: (message: string) => void;
}) => {
  // ─────────────────────────────────────────────────────────────────────
  const { supabase } = useSupabase();

  const {
    isPending: isFetchingOnlineItems,
    isError,
    data: onlineItems,
    error,
    refetch,
  } = useQuery({
    queryKey: ["getItems"],
    queryFn: async () => await supabase.from("practice").select("*"),
  });

  // ─────────────────────────────────────────────────────────────────────

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: async (id: number) =>
      await supabase.from("practice").delete().eq("id", id),
    onSuccess: (data, variables, context) => {
      setSuccessToastMessage("Item deleted");
      showSuccessToast();
      refetch();
    },
    onError: (error, variables, context) => {
      setErrorToastMessage("Error deleting item");
      showErrorToast();
      console.error("error", error);
    },
  });

  // ─────────────────────────────────────────────────────────────────────

  const [items, setItems] = useState<PracticeItem_Type[]>([]);
  const [itemsChecked, setItemsChecked] = useState<{ [id: number]: boolean }>(
    {}
  );

  // ─────────────────────────────────────────────────────────────────────

  const filteredItemsByText = items.filter(({ name, type }) =>
    `${name} ${type}`.toLowerCase().includes(filterByText.toLowerCase())
  );

  const atLeastOneChecked = Object.keys(itemsChecked).some(
    (key) => itemsChecked[key as unknown as number]
  );
  const areAllChecked = Object.keys(itemsChecked).every(
    (key) => itemsChecked[key as unknown as number]
  );

  const itemsCheckedFromBackend = items.filter(
    (item) => item.is_from_backend && itemsChecked[item.id]
  );
  const onlyOneItemChecked =
    items.filter((item) => itemsChecked[item.id]).length === 1;

  // ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isError) {
      setErrorToastMessage("Error fetching items");
      showErrorToast();
      console.error("error", error);
    }
  }, [isError, error, setErrorToastMessage, showErrorToast]);

  useEffect(() => {
    if (onlineItems?.data) {
      const allItems = combineItems(localItems, onlineItems?.data || []);
      const allItemsUnchecked = allItems.reduce(
        (acc, { id }) => ({ ...acc, [id]: false }),
        {}
      );

      setItemsChecked(allItemsUnchecked);
      setItems(allItems);
    }
  }, [localItems, onlineItems?.data]);

  // ─────────────────────────────────────────────────────────────────────

  const setAllItemsChecked = useCallback(
    (checked: boolean) => {
      setItemsChecked(
        items.reduce((acc, { id }) => ({ ...acc, [id]: checked }), {})
      );
    },
    [items]
  );

  // ─────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-1 flex-col overflow-y-scroll">
      {isFetchingOnlineItems ? (
        <div className="flex flex-1 items-center justify-center">
          <CircularProgress sx={{ color: colors.main }} />
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div className="flex">
              <CheckboxItem
                label={<b>All</b>}
                labelColor={colors.secondary}
                checkboxProps={{
                  checked: areAllChecked,
                  checkedIsIndeterminate: !areAllChecked && atLeastOneChecked,
                  onCheckedChange: (allChecked) =>
                    setAllItemsChecked(allChecked),
                }}
              />
            </div>
            {onlyOneItemChecked && itemsCheckedFromBackend.length === 1 && (
              <div className="ml-3">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => mutate(itemsCheckedFromBackend[0].id)}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            )}
            <div className="flex flex-1 justify-end">
              <b className="w-12 mx-3" style={{ color: colors.secondary }}>
                Jobs
              </b>
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-y-scroll">
            {filteredItemsByText.map(
              ({ amount_of_jobs, name, type, id }, index) => (
                <div key={index} className="flex mt-2">
                  <div className="flex flex-1">
                    <CheckboxItem
                      label={`${name} - ${type}`}
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
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const combineItems = (
  localItems: PracticeItem_Type[],
  onlineItems: PracticeItem_Type[]
) => {
  const _onlineItems = onlineItems.map((item) => ({
    ...item,
    is_from_backend: true,
  }));
  const localItemsIds = localItems.map(({ id }) => id);

  const items = localItems.concat(
    _onlineItems.filter(({ id }) => !localItemsIds.includes(id))
  );

  return items;
};
