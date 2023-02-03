export interface UserDetail{
  user_id?:string;
  user_name:string;
  country:string;
  created_at:Date;
  updated_at:Date;
  address_details?:[];
}
