import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ActivityForm from '../components/Activity-Form/ActivityForm';
import { Tabs, Tab } from '../components/Tabs/Tabs';
import CategorySelect from '../components/CategorySelect/CategorySelect';
import { TYPE_OUTCOME, TYPE_INCOME } from '../utils/utility';
import { Category, Item } from '../types';
import {
  useItem,
  useCategories,
  useCreateItem,
  useUpdateItem,
} from '../services/items';

const tabs = [TYPE_OUTCOME, TYPE_INCOME];
const initialValues = {
  amount: 0,
  date: '',
  title: '',
};

const Create = () => {
  const { id } = useParams<{ id: string }>();
  const { data: categories = {} } = useCategories();

  const [isValid, setIsValid] = useState(true);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // editItem has to be a state, otherwise
  // every refresh(by setIsValid) would re - run the function component thus pass by a new item
  // const [editItem, setEditItem] = useState<Item | {}>({});

  let navigate = useNavigate();
  const { mutate: createItem } = useCreateItem();
  const { mutate: updateItem } = useUpdateItem();
  const { data: editItem } = useItem(id);

  useEffect(() => {
    // wait until we have initial data
    const hasEditItemCategory = id && editItem && categories[editItem.cid];
    setSelectedTab(
      hasEditItemCategory ? categories[editItem.cid].type : TYPE_OUTCOME
    );
    setSelectedCategory(hasEditItemCategory ? categories[editItem.cid] : null);
  }, [id, editItem, categories]);

  const submitForm = useCallback(
    async (data: Partial<Item>, isEditMode) => {
      if (!selectedCategory) {
        setIsValid(false);
        return;
      }
      if (!isEditMode) {
        await createItem({
          data,
          categoryId: selectedCategory.id,
        });
        navigate('/');
      } else {
        await updateItem({
          data: { ...editItem, ...data },
          categoryId: selectedCategory.id,
        });
        navigate('/');
      }
    },
    [navigate, createItem, selectedCategory, updateItem, editItem]
  );

  const cancelSubmit = useCallback(() => {
    navigate('/');
  }, [navigate]);

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
    <Formik
      initialValues={editItem ?? initialValues}
      enableReinitialize
      validationSchema={Yup.object({
        amount: Yup.number()
          .required('Required')
          .positive('价格数字必须大于0')
          .integer(),
        date: Yup.date().required('Required'),
        title: Yup.string().required('Required'),
      })}
      onSubmit={(values) => {
        submitForm(values, !!editItem);
      }}
    >
      {({ errors, touched, values }) => {
        console.log(errors);
        return (
          <div
            className="create-page py-3 px-3 rounded mt-3"
            style={{ background: '#fff' }}
          >
            <Tabs
              activeIndex={tabs.indexOf(selectedTab)}
              onTabChange={onTabChange}
            >
              <Tab>Outcome</Tab>
              <Tab>Income</Tab>
            </Tabs>
            <CategorySelect
              categories={filterCategories}
              onSelectCategory={selectCategory}
              selectedCategory={selectedCategory}
            />
            <ActivityForm
              onCancelSubmit={cancelSubmit}
              item={editItem}
              errors={errors}
              touched={touched}
            />
            {!isValid && (
              <div className="alert alert-danger mt-5" role="alert">
                请选择分类信息
              </div>
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default Create;
