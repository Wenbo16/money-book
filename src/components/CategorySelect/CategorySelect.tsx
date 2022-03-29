import React, { memo } from "react";
import { Colors } from "../../utility";
import { IonIcon, addIcons } from "react-svg-ionicons";
import bundle from "react-svg-ionicons/bundles/all";
import { Category } from "../../types";

// This loads the full Ionicon set
addIcons(bundle);

interface CategorySelectProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (c: Category) => void;
}

const CategorySelect = memo(
  ({ categories, selectedCategory, onSelectCategory }: CategorySelectProps) => {
    const selectedCategoryId = selectedCategory && selectedCategory.id;
    return (
      <div className="category-select">
        <div className="row">
          {categories.map((category, index) => {
            const iconColor =
              category.id === selectedCategoryId ? Colors.white : Colors.gray;
            const backColor =
              category.id === selectedCategoryId
                ? Colors.blue
                : Colors.lightGray;

            const activeClassName =
              selectedCategoryId === category.id
                ? "category-item col-3 active"
                : "category-item col-3";

            return (
              <div
                className={activeClassName}
                key={index}
                role="button"
                style={{ textAlign: "center" }}
                onClick={() => {
                  onSelectCategory(category);
                }}
              >
                <IonIcon
                  className="rounded-circle"
                  style={{ backgroundColor: backColor, padding: "5px" }}
                  fontSize="50px"
                  color={iconColor}
                  name={category.iconName}
                />
                <p>{category.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default CategorySelect;
