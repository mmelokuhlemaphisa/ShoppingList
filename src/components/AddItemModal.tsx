// src/components/AddItemModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (item: { name: string; quantity: number; category: string }) => void;
}

export default function AddItemModal({
  visible,
  onClose,
  onSave,
}: AddItemModalProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState("Grocery");

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      name: name.trim(),
      quantity: parseInt(quantity) || 1,
      category,
    });

    // Reset form
    setName("");
    setQuantity("1");
    setCategory("Grocery");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Add New Item</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons
                name="close"
                size={24}
                color={colors.text.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter item name"
              placeholderTextColor={colors.text.secondary}
              autoFocus
            />
          </View>

          <View style={styles.formRow}>
            <View
              style={[
                styles.formGroup,
                { flex: 1, marginRight: spacing.small },
              ]}
            >
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1 }]}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerText}>{category}</Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={colors.text.primary}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
              disabled={!name.trim()}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: spacing.medium,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.medium,
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
    fontWeight: "600",
  },
  formGroup: {
    marginBottom: spacing.medium,
  },
  formRow: {
    flexDirection: "row",
    marginHorizontal: -spacing.xxsmall,
  },
  label: {
    ...typography.caption,
    color: colors.text.primary,
    marginBottom: spacing.xxsmall,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.small,
    ...typography.body,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickerText: {
    ...typography.body,
    color: colors.text.primary,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: spacing.medium,
  },
  button: {
    paddingVertical: spacing.small,
    paddingHorizontal: spacing.medium,
    borderRadius: 8,
    marginLeft: spacing.small,
    minWidth: 100,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.surface,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.text.primary,
  },
  saveButtonText: {
    ...typography.button,
    color: colors.white,
  },
});
