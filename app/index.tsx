// app/index.tsx
import "react-native-get-random-values";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import {
  addItem,
  togglePurchased,
  deleteItem,
  editItem,
} from "../src/redux/shoppingSlice";
import { ShoppingItem } from "../src/types/shopping";
import ShoppingItemComponent from "../src/components/ShoppingItem";
import AddItemModal from "../src/components/AddItemModal";
import EditItemModal from "../src/components/EditItemModal";

import { colors } from "../src/theme/colors";
import { spacing } from "../src/theme/spacing";
import { typography } from "../src/theme/typography";
import { RootState } from "../src/redux/store";

export default function ShoppingListScreen() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShoppingItem | null>(null);

  const items = useSelector((state: RootState) => state.shopping.items);
  const dispatch = useDispatch();

const handleAddItem = (
  item: Omit<ShoppingItem, "id" | "purchased" | "dateAdded">
) => {
  dispatch(addItem(item));
};



  const handleTogglePurchased = (id: string) => {
    dispatch(togglePurchased(id));
  };

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleEditItem = (updatedItem: ShoppingItem) => {
    dispatch(editItem(updatedItem));
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
        <Text style={styles.subtitle}>
          {items.filter((item) => item.purchased).length} of {items.length}{" "}
          purchased
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ShoppingItemComponent
            item={item} // this is a ShoppingItem type
            onToggle={() => handleTogglePurchased(item.id)}
            onDelete={() => handleDeleteItem(item.id)}
            onEdit={() => setSelectedItem(item)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons
              name="shopping-basket"
              size={48}
              color={colors.mediumGray}
            />
            <Text style={styles.emptyText}>Your shopping list is empty</Text>
            <Text style={styles.emptySubtext}>Tap + to add an item</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsAddModalVisible(true)}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
      <AddItemModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSave={(item) => {
          handleAddItem(item); // dateAdded is handled automatically in the slice
          setIsAddModalVisible(false);
        }}
      />

      {selectedItem && (
        <EditItemModal
          visible={true}
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={handleEditItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.medium,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
    fontWeight: "600",
    marginBottom: spacing.xxsmall,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  list: {
    flexGrow: 1,
    padding: spacing.medium,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.large,
  },
  emptyText: {
    ...typography.h4,
    color: colors.text.primary,
    marginTop: spacing.medium,
    marginBottom: spacing.xxsmall,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.text.secondary,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
