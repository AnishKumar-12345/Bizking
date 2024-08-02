<template>
  <VBadge v-bind="avatarBadgeProps" color="error" overlap>
    <template #badge>
      {{ countUnreadNotifications }}
      <!-- <span class="badge-counter" color="primary">{{ countUnreadNotifications }}</span> -->
    </template>
    <VAvatar
      style="cursor: pointer;"
      color="primary"
      variant="tonal"
      size="40"
    >
      <VIcon
        icon="mdi-bell-outline"
        size="24"
      />
      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="450"
        height="250"
        location="bottom end"
        offset="14px"
      >     
        <VList>
           <VListItem class="notification-heading">
            <template #default>
              <VIcon
                icon="mdi-email"
                color="primary"
                size="20"
                style="margin-right: 10px;"
              />
              <VTypography class="subtitle-1">Notifications</VTypography>
            </template>
          </VListItem>

           <!-- Display message when no unread notifications -->
          <VListItem v-if="notifications.length === 0">
            <VListItemSubtitle style="font-size: 12px;"><h2>Your Notification is empty!</h2></VListItemSubtitle>
          </VListItem>
          <!-- 👉 Bell Icon & Notifications -->
          <VListItem v-for="notification in notifications" :key="notification.notification_id" link>
                <template #prepend>
                  <VIcon
                    v-if="notification.status === '0'"
                    class="me-2"
                    icon="mdi-circle"
                    size="10"
                    color="error"
                  />
                </template>
                <!-- [{{notification}}] -->        
            <!-- <VListItemSubtitle style="font-size: 12px;" v-if="countUnreadNotifications === 0 "><h2>Your Notification is empty !</h2> </VListItemSubtitle> -->
            <VListItemTitle class="font-weight-bold" style="font-size: 16px;">{{ notification.action }}</VListItemTitle>
            <VListItemSubtitle style="font-size: 12px;">{{ notification.message }}</VListItemSubtitle>
            <VListItemSubtitle style="font-size: 10px;">{{ notification.created_date }}</VListItemSubtitle>
          
           
            <VDivider class="my-2" />
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const notifications = computed(() => store.state.notifications);

    // Compute unread notifications count
    const countUnreadNotifications = computed(() =>
      notifications.value.filter(notification => notification.status === '0').length
    );
 
    return {
      notifications,
      countUnreadNotifications,
    };
  },
};
</script>

<style scoped>
.font-weight-bold {
  font-weight: bold;
}

.v-list-item__subtitle {
  font-size: 14px;
  color: #333; /* Adjust color as needed */
}
/* .notification-message {
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
} */
.badge-counter {
  background-color: red;
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 12px;
  position: absolute;
  top: -5px;
  right: -5px;
}
</style>
