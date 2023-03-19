import { FormControl, HStack, FormErrorMessage } from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { useCallback } from "react";
import api from "@app/api";
import { debounce } from "@app/utils";
import { useRouter } from "next/router";

interface Users {
  name: string;
  slug: string;
}

export const TopBar = () => {
  const router = useRouter();

  const getUsers = async (input: string) => {
    const { data } = await api.get(`user/search?search=${input}&limit=20`);
    console.log(data);
    const user = await data.map((el: Users) => ({
      label: el.name,
      value: el.slug,
    }));
    return user;
  };

  const loadOptionsDebounced = useCallback(
    debounce((inputValue: string, callback: (options: any) => void) => {
      getUsers(inputValue).then((options) => {
        callback(options);
      });
    }, 500),
    []
  );

  return (
    <HStack
      width="100%"
      height="60px"
      alignItems="center"
      justifyContent="center"
    >
      <FormControl label="Search" id="Users" width="560px">
        <AsyncSelect
          placeholder="Search Users"
          isSearchable
          defaultOptions
          loadOptions={loadOptionsDebounced}
          onChange={(e: { label: string; value: string }) => {
            router.push(`/${e?.value}` as string);
          }}
        />
        <FormErrorMessage>Please pick an option</FormErrorMessage>
      </FormControl>
    </HStack>
  );
};
