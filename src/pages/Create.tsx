import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ActivityForm from '../components/Activity-Form/ActivityForm';
import { Tabs, Tab } from '../components/Tabs/Tabs';
import CategorySelect from '../components/CategorySelect/CategorySelect';
import { TYPE_OUTCOME, TYPE_INCOME } from '../utility';
import { AppContext } from '../context';
import { Category, Item } from '../types';
import {
  useItems,
  useCategories,
  useCreateItem,
  useUpdateItem,
} from '../services/items';

const tabs = [TYPE_OUTCOME, TYPE_INCOME];

const Create = () => {
  const { id } = useParams<{ id: string }>();
  const { currentDate } = useContext(AppContext);
  const { data: categories = {} } = useCategories();
  const { data: items = {} } = useItems({
    monthCategory: `${currentDate.year}-${currentDate.month}`,
  });

  const [isValid, setIsValid] = useState(true);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // editItem has to be a state, otherwise every refresh(by setIsValid) would re-run the function component thus pass by a new item
  const [editItem, setEditItem] = useState<Item | {}>({});

  let history = useHistory();
  const { mutate: mutateCreateItem } = useCreateItem();
  const { mutate: updateCreateItem } = useUpdateItem();

  useEffect(() => {
    // wait until we have initial data
    const curEditItem = id && items[id] ? items[id] : {};

    setEditItem(curEditItem);
    const hasEditItemCategory =
      id && curEditItem && categories[curEditItem.cid];
    setSelectedTab(
      hasEditItemCategory ? categories[curEditItem.cid].type : TYPE_OUTCOME
    );
    setSelectedCategory(
      hasEditItemCategory ? categories[curEditItem.cid] : null
    );
  }, [id, items, categories]);

  const submitForm = useCallback(
    async (data: Partial<Item>, isEditMode) => {
      if (!selectedCategory) {
        setIsValid(false);
        return;
      }
      if (!isEditMode) {
        await mutateCreateItem({
          data,
          categoryId: selectedCategory.id,
        });
        history.push('/');
      } else {
        await updateCreateItem({ data, categoryId: selectedCategory.id });
        history.push('/');
      }
    },
    [selectedCategory]
  );

  const cancelSubmit = useCallback(() => {
    history.push('/');
  }, []);

  const filterCategories = useMemo(
    () =>
      Object.keys(categories)
        .filter((id) => categories[id].type === selectedTab)
        .map((id) => categories[id]),
    [categories, selectedTab]
  );

  const onTabChange = useCallback((index) => {
    setSelectedTab(tabs[index]);
  }, []);

  const selectCategory = useCallback((category) => {
    setIsValid(true);
    setSelectedCategory(category);
  }, []);

  return (
    <div
      className="create-page py-3 px-3 rounded mt-3"
      style={{ background: '#fff' }}
    >
      <Tabs activeIndex={tabs.indexOf(selectedTab)} onTabChange={onTabChange}>
        <Tab>Outcome</Tab>
        <Tab>Income</Tab>
      </Tabs>
      <CategorySelect
        categories={filterCategories}
        onSelectCategory={selectCategory}
        selectedCategory={selectedCategory}
      />
      <ActivityForm
        onFormSubmit={submitForm}
        onCancelSubmit={cancelSubmit}
        item={editItem}
      />
      {!isValid && (
        <div className="alert alert-danger mt-5" role="alert">
          请选择分类信息
        </div>
      )}
    </div>
  );
};

export default Create;
