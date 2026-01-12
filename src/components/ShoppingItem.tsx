import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { ShoppingItem as Item } from "../types/shopping";

interface Props {
  item: Item;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ShoppingItemComponent({ item, onToggle, onEdit, onDelete }: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity: item.purchased ? 0.7 : 1,
          backgroundColor: isPressed ? colors.lightGray : colors.background,
        },
      ]}
    >
      <TouchableOpacity 
        style={styles.content}
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, item.purchased && styles.checkboxChecked]}>
            {item.purchased && (
              <MaterialIcons name="check" size={16} color={colors.white} />
            )}
          </View>
        </View>
        
        <View style={styles.textContainer}>
          <Text 
            style={[
              styles.name, 
              item.purchased && styles.nameCompleted
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text style={styles.quantity}>Qty: {item.quantity}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onEdit}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="edit" size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="delete-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.small,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: spacing.medium,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.medium,
  },
  name: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: 2,
  },
  nameCompleted: {
    textDecorationLine: 'line-through',
    color: colors.text.secondary,
  },
  quantity: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: spacing.xsmall,
    marginLeft: spacing.small,
  },
});
