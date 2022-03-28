import React, { useState, useContext, useCallback, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ActivityForm from '../components/Activity-Form/ActivityForm';
import { Tabs, Tab } from '../components/Tabs/Tabs';
import CategorySelect from '../components/CategorySelect/CategorySelect';
import { TYPE_OUTCOME, TYPE_INCOME } from '../utility';
import { AppContext } from '../context';
import { useEffect } from 'react';
import { Category, Item } from '../types';

const tabs = [TYPE_OUTCOME, TYPE_INCOME];

const Create = () => {
  const { id } = useParams<{ id: string }>();
  const { items, categories, actions } = useContext(AppContext);
  const [isValid, setIsValid] = useState(true);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);

  // editItem has to be a state, otherwise every refresh(by setIsValid) would re-run the function component thus pass by a new item
  const [editItem, setEditItem] = useState<Item | {}>({});

  let history = useHistory();

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
    (data, isEditMode) => {
      if (!selectedCategory) {
        setIsValid(false);
        return;
      }
      if (!isEditMode) {
        actions
          .createItem(data, selectedCategory.id)
          .then(() => history.push('/'));
      } else {
        actions
          .updateItem(data, selectedCategory.id)
          .then(() => history.push('/'));
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
